import React, { useEffect, useState } from 'react';
import { Button, GetProp, Image, message, Table, TableProps } from 'antd';
import { IRecordType } from '@pages/words/types';
import UpdateModal from '@pages/words/updateModal';
import {
	createWordCompilationAssociation,
	deleteWord,
	deleteWordCompilationAssociation,
	fetchWords,
	fetchWordsCompilationsAssociations,
} from '@shared/store/slices/words.slice';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@shared/store/hooks';
import { fetchAllWordCompilations } from '@shared/store/slices/word-compilations.slice';
import { CreateAssociationColumn } from '../../feature/create-association-column';
import { debounce } from 'lodash';

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

const PAGE_SIZE = 10;

export const WordsTableWidget = () => {
	const wordsStore = useAppSelector((state) => state.wordsStore);
	const wordCompilationsStore = useAppSelector((state) => state.wordCompilationsStore);
	const dispatch = useAppDispatch();
	const [isDataLoaded, setIsDataLoaded] = useState(false); // FIXME убрать локальное состояние, если возвожно

	const { currentPage, totalWords } = wordsStore;

	useEffect(() => {
		Promise.all([
			dispatch(
				fetchWords({
					pagination: {
						pageSize: 10,
						current: 1,
					},
				}),
			),
			dispatch(fetchWordsCompilationsAssociations()),
			dispatch(fetchAllWordCompilations()),
		]).then(() => {
			setIsDataLoaded(true);
		});
	}, []);

	const { wordCompilationAssociations } = wordsStore;

	const columns = [
		{
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Слово',
			dataIndex: 'word',
			key: 'word',
		},
		{
			title: 'Перевод',
			dataIndex: 'translation',
			key: 'translation',
		},
		{
			title: 'Пример',
			dataIndex: 'example',
			key: 'example',
		},
		{
			title: 'Перевод примера',
			dataIndex: 'exampleTranslation',
			key: 'exampleTranslation',
		},
		{
			title: 'Картинка',
			dataIndex: 'image',
			key: 'image',
		},
		{
			title: 'Миниатюра',
			key: 'mini-image',
			render: ({ image }: { image: string }) => {
				return (
					<Image
						src={`http://localhost:3009/static/${image}`}
						width={60}
						style={{ border: '1px solid', borderRadius: 6 }}
					/>
				);
			},
		},
		{
			title: 'Подборки слов',
			key: 'edit',
			render: (record: IRecordType) => {
				const filteredAssociations = wordCompilationAssociations.filter(
					(item) => item.wordId === record.id,
				);

				const defaultValue = filteredAssociations.map((item) => item.compilationTitle);

				const dropdownNames = wordCompilationsStore.compilations.filter(
					(compilation) => !defaultValue.includes(compilation.title),
				);

				const createAssociation = (compilationId: number) => {
					dispatch(
						createWordCompilationAssociation({
							wordId: record.id,
							compilationId,
						}),
					);
				};

				const deleteAssociation = debounce((compilation: string) => {
					const association = wordCompilationAssociations.find(
						(item) => item.compilationTitle === compilation,
					);
					const associationId = association!.relationsId;
					dispatch(deleteWordCompilationAssociation(associationId));
				}, 300);

				return isDataLoaded ? (
					<CreateAssociationColumn
						defaultValue={defaultValue}
						dropdownNames={dropdownNames}
						createAssociation={createAssociation}
						deleteAssociation={deleteAssociation}
					/>
				) : null;
			},
		},
		{
			title: 'Редактировать',
			key: 'edit',
			render: (record: IRecordType) => <UpdateModal record={record} />,
		},
		{
			title: 'Удалить',
			key: 'delete',
			render: (record: IRecordType) => (
				<Button
					type="link"
					danger
					onClick={() => dispatch(deleteWord(record.id))}
					style={{ border: '1px solid' }}
				>
					<DeleteOutlined style={{ color: 'red', fontSize: 20 }} />
				</Button>
			),
		},
	];

	const dataSource = wordsStore.words.map((word) => ({
		...word,
		key: word.id,
	}));

	const handleChange = (pagination: TablePaginationConfig) => {
		if (pagination.pageSize && pagination.current) {
			dispatch(
				fetchWords({
					pagination: {
						pageSize: pagination.pageSize,
						current: pagination.current,
					},
				}),
			);
		} else {
			message.error('Произошла ошибка');
		}
	};

	return (
		<Table
			dataSource={dataSource}
			columns={columns}
			onChange={handleChange}
			pagination={{
				pageSize: PAGE_SIZE,
				current: currentPage,
				total: totalWords,
				showSizeChanger: false,
				showQuickJumper: false,
				position: ['topRight', 'bottomRight'],
			}}
		/>
	);
};
