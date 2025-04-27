document.addEventListener('DOMContentLoaded', function () {
    const textInput = document.getElementById('text-input');
    const speakButton = document.getElementById('speak-button'); // <--- 获取按钮元素

    // 获取并打印可用语音 (方便调试选择)
    chrome.tts.getVoices(function (voices) {
        console.log('Available TTS voices:', voices);
    });

    // 封装朗读逻辑为一个函数
    const triggerSpeak = () => {
        const text = textInput.value.trim();
        console.log('Trigger speak, text:', text);

        if (text) {
            const options = {
                lang: 'zh-CN',
                onEvent: function (event) {
                    console.log('TTS Event:', event.type);
                    if (event.type === 'error') {
                        console.error('TTS Error:', event.errorMessage);
                    }
                }
            };

            chrome.tts.getVoices(function (voices) {
                let selectedVoice = voices.find(voice => voice.lang === 'zh-CN' && voice.voiceName.includes('Ting-Ting'));
                if (!selectedVoice) {
                    selectedVoice = voices.find(voice => voice.lang === 'zh-CN' && voice.voiceName.includes('Huihui'));
                }
                if (!selectedVoice) {
                    selectedVoice = voices.find(voice => voice.lang === 'zh-CN');
                }

                if (selectedVoice) {
                    options.voiceName = selectedVoice.voiceName;
                    console.log('Using voice:', selectedVoice.voiceName);
                } else {
                    console.warn('No suitable zh-CN voice found. Using default.');
                }

                chrome.tts.speak(text, options, function () {
                    if (chrome.runtime.lastError) {
                        console.error('TTS Speak Error:', chrome.runtime.lastError.message);
                    } else {
                        console.log('Speech queued successfully.');
                        // V--- 这里就是清空文本框的代码 ---V
                        textInput.value = ''; // 清空输入框
                        // ^--- 这里就是清空文本框的代码 ---^
                    }
                });

            });

        } else {
            console.log('Text is empty.');
            textInput.value = ''; // 空提交也清空
        }
        // 朗读后让输入框重新获得焦点，方便连续输入
        textInput.focus();
    };

    if (textInput) {
        textInput.focus(); // 初始聚焦

        // 监听键盘事件 (Enter 键)
        textInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                triggerSpeak(); // <--- 调用封装的朗读函数
            }
        });
    } else {
        console.error('Input element not found!');
    }

    // 监听按钮点击事件
    if (speakButton) {
        speakButton.addEventListener('click', function () {
            triggerSpeak(); // <--- 调用封装的朗读函数
        });
    } else {
        console.error('Speak button element not found!');
    }
});