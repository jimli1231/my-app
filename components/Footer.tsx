import Link from 'next/link';
import { Store, Github, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600 mb-4">
              <Store className="w-6 h-6" />
              <span>极简商城</span>
            </Link>
            <p className="text-gray-500 max-w-sm">
              为您提供精心挑选的电子产品和配件，致力于提升您的生活品质。极简设计，极致体验。
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-600 hover:text-blue-600 transition-colors">
                  购物车
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">开发者资源</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://nextjs.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  Next.js 文档 <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  Vercel 平台 <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/vercel/next.js"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  GitHub <Github className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} 极简商城. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
