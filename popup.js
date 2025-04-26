document.addEventListener('DOMContentLoaded', function () {
    const textInput = document.getElementById('text-input');

    // 获取并打印可用语音 (方便调试选择)
    chrome.tts.getVoices(function (voices) {
        console.log('Available TTS voices:', voices);
        // 你可以在这里查找你想要的中文语音, 例如:
        // const preferredVoice = voices.find(voice => voice.lang === 'zh-CN' && voice.voiceName.includes('Huihui')); // 示例：尝试寻找特定的中文语音名
        // if (preferredVoice) {
        //     console.log('Using voice:', preferredVoice.voiceName);
        // } else {
        //     console.log('Preferred voice not found, using default zh-CN voice.');
        // }
    });

    if (textInput) {
        textInput.focus();

        textInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                const text = textInput.value.trim();
                console.log('Enter pressed, text:', text);

                if (text) {
                    // 尝试指定一个你从 getVoices 列表中找到的、听起来更好的 voiceName
                    // 注意：'Ting-Ting' 是 macOS 上常见的中文语音名，你需要根据你的系统和 getVoices 的输出来调整
                    const options = {
                        lang: 'zh-CN',
                        // voiceName: 'Ting-Ting', // <--- 在这里指定你想用的 voiceName
                        // voiceName: 'Microsoft Huihui Desktop - Chinese (Simplified)', // Windows 上的一个例子
                        onEvent: function (event) {
                            console.log('TTS Event:', event.type);
                            if (event.type === 'error') {
                                console.error('TTS Error:', event.errorMessage);
                            }
                        }
                        // 你也可以调整语速和音调
                        // rate: 1.0, // 语速，默认 1.0，范围 0.1 到 10.0
                        // pitch: 1.0 // 音调，默认 1.0，范围 0.0 到 2.0
                    };

                    // 查找一个中文语音并使用它 (更动态的方式)
                    chrome.tts.getVoices(function (voices) {
                        // 优先选择包含特定关键词的中文语音 (根据你的系统调整关键词)
                        let selectedVoice = voices.find(voice => voice.lang === 'zh-CN' && voice.voiceName.includes('Ting-Ting')); // macOS 示例
                        if (!selectedVoice) {
                            selectedVoice = voices.find(voice => voice.lang === 'zh-CN' && voice.voiceName.includes('Huihui')); // Windows 示例
                        }
                        // 如果找不到特定的，就找第一个可用的中文语音
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
                            }
                        });
                    });

                } else {
                    console.log('Text is empty.');
                }
            }
        });
    } else {
        console.error('Input element not found!');
    }
});