export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "高级智能手表",
    price: 1999,
    description: "具备多种健康监测功能和超长续航。支持心率、血氧、睡眠监测。",
    image: "https://picsum.photos/seed/watch/400/400",
  },
  {
    id: 2,
    name: "降噪无线耳机",
    price: 1299,
    description: "顶级降噪效果，为您带来沉浸式的音频体验。长达30小时的电池寿命。",
    image: "https://picsum.photos/seed/headphones/400/400",
  },
  {
    id: 3,
    name: "便携式笔记本电脑",
    price: 5999,
    description: "轻薄便携，性能强劲，适合办公与娱乐。搭载最新的处理器。",
    image: "https://picsum.photos/seed/laptop/400/400",
  },
  {
    id: 4,
    name: "智能家居摄像头",
    price: 299,
    description: "高清画质，支持手机远程查看，守护您的家庭安全。",
    image: "https://picsum.photos/seed/camera/400/400",
  },
  {
    id: 5,
    name: "机械键盘",
    price: 499,
    description: "优秀的打字手感，RGB背光，多种轴体可选。",
    image: "https://picsum.photos/seed/keyboard/400/400",
  },
  {
    id: 6,
    name: "无线充电板",
    price: 159,
    description: "支持多种型号手机快速充电，简约设计。",
    image: "https://picsum.photos/seed/charger/400/400",
  },
];
