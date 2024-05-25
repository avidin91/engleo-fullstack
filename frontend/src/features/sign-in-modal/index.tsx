import React, { FC, useState } from 'react';
import { Button, Modal } from 'antd';
import SignIn from '@features/sign-in-modal/sign-in';
import Registration from '@features/sign-in-modal/registration';

type TSignInModal = {
	text: string;
	button: 'small' | 'large';
	formPrefix: string;
};

const SignInModal: FC<TSignInModal> = ({ text, button, formPrefix }) => {
	const [isRegister, setIsRegister] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const swapRegisterToSignIn = () => {
		setIsRegister(false);
	};

	const swapSignInToRegister = () => {
		setIsRegister(true);
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setIsRegister(false);
	};

	return (
		<>
			{button === 'small' && (
				<Button
					type="primary"
					onClick={showModal}
					style={{ backgroundColor: '#fdc90d', color: 'black' }}
				>
					Войти
				</Button>
			)}
			{button === 'large' && (
				<Button
					size="large"
					style={{ width: 500, height: 50 }}
					type="primary"
					onClick={showModal}
				>
					{text}
				</Button>
			)}

			<Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
				{isRegister ? (
					<Registration
						swapRegisterToSignIn={swapRegisterToSignIn}
						formPrefix={formPrefix}
					/>
				) : (
					<SignIn swapSignInToRegister={swapSignInToRegister} formPrefix={formPrefix} />
				)}
			</Modal>
		</>
	);
};

export default SignInModal;
