import React, { useEffect, useState } from 'react';
import { Button, GetProp, Image, message, Table, TableProps } from 'antd';
import { IRecordType } from '@pages/word-compilations/types';
import UpdateModal from '@pages/word-compilations/updateModal';
import {
	createGroupCompilationAssociation,
	deleteCompilation,
	deleteGroupCompilationAssociation,
	fetchGroupsCompilationsAssociations,
	fetchWordCompilations,
} from '@shared/store/slices/word-compilations.slice';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@shared/store/hooks';
import { fetchAllGroups } from '@shared/store/slices/word-groups.slice';
import { CreateAssociationColumn } from '../../feature/create-association-column';
import { debounce } from 'lodash';

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

const PAGE_SIZE = 10;

export const WordCompilationsTable = () => {
	const wordCompilationsStore = useAppSelector((state) => state.wordCompilationsStore);
	const groupsStore = useAppSelector((state) => state.wordGroupsStore);
	const dispatch = useAppDispatch();
	const [isDataLoaded, setIsDataLoaded] = useState(false); // FIXME убрать локальное состояние, если возвожно

	useEffect(() => {
		Promise.all([
			dispatch(
				fetchWordCompilations({
					pagination: {
						pageSize: 10,
						current: 1,
					},
				}),
			),
			dispatch(fetchAllGroups()),
			dispatch(fetchGroupsCompilationsAssociations()),
		]).then(() => {
			setIsDataLoaded(true);
		});
	}, []);

	const { groupsCompilationsAssociations, totalWords, currentPage } = wordCompilationsStore;

	const columns = [
		{
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Заголовок',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Заголовок на английском',
			dataIndex: 'titleInEnglish',
			key: 'titleInEnglish',
		},
		{
			title: 'Описание',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Ссылка',
			dataIndex: 'slug',
			key: 'slug',
		},
		{
			title: 'Картинка',
			dataIndex: 'image',
			key: 'image',
		},
		{
			title: 'Миниатюра',
			key: 'mini-image',
			render: ({ image }: { image: string }) => (
				<Image
					src={`http://localhost:3009/static/${image}`}
					width={60}
					style={{ border: '1px solid', borderRadius: 6 }}
				/>
			),
		},
		{
			title: 'Группы подборок',
			key: 'edit',
			render: (record: IRecordType) => {
				const filteredAssociations = groupsCompilationsAssociations.filter(
					(item) => item.compilationId === record.id,
				);

				const defaultValue = filteredAssociations.map((item) => item.groupTitle);

				const dropdownNames = groupsStore.groups.filter(
					(group) => !defaultValue.includes(group.title),
				);
				const createAssociation = (groupId: number) => {
					dispatch(
						createGroupCompilationAssociation({
							compilationId: record.id,
							groupId,
						}),
					);
				};

				const deleteAssociation = debounce((group: string) => {
					const association = groupsCompilationsAssociations.find(
						(item) => item.groupTitle === group,
					);
					const associationId = association!.relationsId;
					dispatch(deleteGroupCompilationAssociation(associationId));
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
					onClick={() => dispatch(deleteCompilation(record.id))}
					style={{ border: '1px solid' }}
				>
					<DeleteOutlined style={{ color: 'red', fontSize: 20 }} />
				</Button>
			),
		},
	];

	const dataSource = wordCompilationsStore.compilations.map((compilation) => ({
		...compilation,
		key: compilation.id,
	}));

	const handleChange = (pagination: TablePaginationConfig) => {
		if (pagination.pageSize && pagination.current) {
			dispatch(
				fetchWordCompilations({
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
