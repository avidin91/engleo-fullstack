import React, { useEffect, useState } from 'react';

const useVoice = () => {
	const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

	useEffect(() => {
		const handleVoicesChanged = () => {
			const updatedVoices = window.speechSynthesis
				.getVoices()
				.filter((voice) => voice.lang === 'en-US' && voice.name === 'Саманта');
			setVoices(updatedVoices);
		};

		speechSynthesis.getVoices();
		window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
		handleVoicesChanged();

		return () => {
			window.speechSynthesis.onvoiceschanged = null;
		};
	}, []);

	function speakText(word: string) {
		window.speechSynthesis.cancel();

		const utterance = new SpeechSynthesisUtterance(word);
		utterance.voice = voices[0];

		window.speechSynthesis.speak(utterance);
	}

	return speakText;
};

export default useVoice;
