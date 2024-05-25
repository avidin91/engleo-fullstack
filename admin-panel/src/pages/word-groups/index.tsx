import React from 'react';
import { Flex, Table } from 'antd';

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	},
];

const dataSource = [
	{
		key: '1',
		name: 'Mike',
		age: 32,
		address: '10 Downing Street',
	},
	{
		key: '2',
		name: 'John',
		age: 42,
		address: '10 Downing Street',
	},
];

const WordGroups = () => {
	return (
		<Flex vertical gap={32}>
			<div>Создать новую группу</div>
			<Table dataSource={dataSource} columns={columns} />
		</Flex>
	);
};

export default WordGroups;
