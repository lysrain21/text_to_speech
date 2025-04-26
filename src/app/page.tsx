'use client'; // 将组件标记为客户端组件

import Image from "next/image";
import { useState, KeyboardEvent, useEffect } from 'react'; // 导入 useEffect

export default function Home() {
  const [text, setText] = useState(''); // 添加状态来存储输入文本

  // 处理语音合成的函数
  const handleSpeak = () => {
    console.log('handleSpeak called with text:', text); // 添加日志
    if (!text.trim()) {
      console.log('Text is empty, returning.'); // 添加日志
      return;
    }

    // 检查浏览器是否支持 SpeechSynthesis
    if ('speechSynthesis' in window) {
      console.log('SpeechSynthesis supported.'); // 添加日志
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';

      // 添加事件监听器以获取更多信息
      utterance.onstart = () => console.log('Speech started...');
      utterance.onend = () => console.log('Speech ended.');
      utterance.onerror = (event) => console.error('SpeechSynthesis Error:', event); // 监听错误

      console.log('Attempting to speak...'); // 添加日志
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('SpeechSynthesis not supported.'); // 添加日志
      alert('抱歉，您的浏览器不支持语音合成。');
    }
  };

  // 处理输入框的回车事件
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    console.log('handleKeyDown called, key:', event.key); // 添加日志
    if (event.key === 'Enter') {
      console.log('Enter key pressed, calling handleSpeak.'); // 添加日志
      handleSpeak();
    }
  };

  // 检查可用的语音
  useEffect(() => {
    if ('speechSynthesis' in window) {
      // 延迟获取，确保语音列表加载完成
      setTimeout(() => {
        const voices = window.speechSynthesis.getVoices();
        console.log('Available voices:', voices);
        const chineseVoice = voices.find(voice => voice.lang.startsWith('zh-CN'));
        if (!chineseVoice) {
          console.warn('No Chinese (zh-CN) voice found. Speech might use a default voice or fail.');
        }
      }, 100); // 延迟 100 毫秒
    }
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-lg"> {/* 调整主区域宽度 */}
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        {/* 添加输入框和说明 */}
        <div className="w-full mt-8">
          <label htmlFor="text-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            输入要朗读的文字：
          </label>
          <input
            type="text"
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown} // 添加键盘事件监听
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="在此输入文字，然后按回车键"
          />
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
