import React, { FC } from 'react';
import { Button, ConfigProvider, Dropdown, Flex, MenuProps, Space, Typography } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface ICreateAssociationColumn {
	defaultValue: string[];
	dropdownNames: { id: number; title: string }[];
	createAssociation: (id: number) => void;
	deleteAssociation: (item: string) => void;
}

export const CreateAssociationColumn: FC<ICreateAssociationColumn> = ({
	defaultValue,
	dropdownNames,
	createAssociation,
	deleteAssociation,
}) => {
	const onClick: MenuProps['onClick'] = ({ key }) => {
		const selectedItem = dropdownNames.find((option) => option.title === key);
		const selectedId = selectedItem!.id;
		createAssociation(selectedId);
	};

	const items: MenuProps['items'] = dropdownNames.map((item) => {
		return {
			key: item.title,
			label: item.title,
		};
	});

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
						onClick={() => deleteAssociation(item)}
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
						style={{ marginTop: 5, width: 'fit-content', alignSelf: 'center' }}
						icon={<PlusOutlined style={{ color: 'green' }} />}
						size={'small'}
					>
						<Space style={{ color: 'green' }}>Добавить</Space>
					</Button>
				</Dropdown>
			</Flex>
		</ConfigProvider>
	);
};
