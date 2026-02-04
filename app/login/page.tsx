"use client";

import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // 模拟登录，直接跳转到首页
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-blue-100 rounded-full">
            <LogIn className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          欢迎回来
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              账号
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-400 cursor-not-allowed"
              placeholder="演示账号"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              密码
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-400 cursor-not-allowed"
              placeholder="••••••••"
              disabled
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
          >
            登录
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-gray-500">
          提示：点击“登录”按钮即可直接进入商城
        </p>
      </div>
    </div>
  );
}
