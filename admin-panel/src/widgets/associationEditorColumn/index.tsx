import { IRecordType } from '@pages/word-compilations/types';
import { debounce } from 'lodash';
import {
	createGroupCompilationAssociation,
	deleteGroupCompilationAssociation,
} from '@shared/store/slices/word-compilations.slice';
import { Button, ConfigProvider, Dropdown, Flex, MenuProps, Space, Typography } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/store/hooks';

const { Text } = Typography;

interface IAssociationEditorColumn {
	record: IRecordType;
}

export const AssociationEditorColumn: FC<IAssociationEditorColumn> = ({ record }) => {
	const wordCompilationsStore = useAppSelector((state) => state.wordCompilationsStore);
	const dispatch = useAppDispatch();

	const { groupsCompilationsAssociations } = wordCompilationsStore;

	const filteredAssociations = groupsCompilationsAssociations.filter(
		(item) => item.compilationId === record.id,
	);
	const defaultValue = filteredAssociations.map((item) => item.groupTitle);

	const dropdownGroupNames = wordCompilationsStore.groups.filter(
		(group) => !defaultValue.includes(group.title),
	);

	const onClick: MenuProps['onClick'] = ({ key }) => {
		const selectedGroup = dropdownGroupNames.find((option) => option.title === key);
		const groupId = selectedGroup!.id;

		dispatch(
			createGroupCompilationAssociation({
				compilationId: record.id,
				groupId,
			}),
		);
	};

	const items: MenuProps['items'] = dropdownGroupNames.map((group) => {
		return {
			key: group.title,
			label: group.title,
		};
	});

	const handleDelete = debounce((group: any) => {
		const association = groupsCompilationsAssociations.find(
			(item) => item.groupTitle === group,
		);
		const associationId = association!.relationsId;
		dispatch(deleteGroupCompilationAssociation(associationId));
	}, 300);

	const text = defaultValue.map((item) => (
		<Flex key={item} style={{ alignSelf: 'center' }}>
			<Text
				style={{
					border: '1px solid #aeacac',
					padding: '0 0 0 5px',
					borderRadius: '5px',
					backgroundColor: '#ececec',
					width: 200,
				}}
			>
				<Flex justify="space-between">
					{item}
					<CloseOutlined
						style={{ color: 'red', fontSize: 20 }}
						onClick={() => handleDelete(item)}
					/>
				</Flex>
			</Text>
		</Flex>
	));

	return (
		<ConfigProvider
			theme={{
				components: {
					Button: {
						colorPrimaryHover: `green`,
					},
				},
			}}
		>
			<Flex vertical gap={4}>
				{text}
				<Dropdown
					menu={{ items, onClick }}
					overlayStyle={{ width: 'max-content' }}
					trigger={['click']}
				>
					<Button
						onClick={(e) => e.preventDefault()}
						style={{ marginTop: 5 }}
						icon={<PlusOutlined style={{ color: 'green' }} />}
					>
						<Space style={{ color: 'green' }}>Добавить группу</Space>
					</Button>
				</Dropdown>
			</Flex>
		</ConfigProvider>
	);
};
