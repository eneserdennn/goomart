'use client'
import {ICONS} from "@/constants/iconConstants";
import { useState } from 'react'
import { Tab } from '@headlessui/react'
import Image from "next/image";
import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import {useGetNotificationsQuery} from "@/redux/features/notificationApiSlice";
import MyCoupons from "@/app/my-coupons/page";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function TabContent({ posts }) {
    return (
        <Tab.Panel
            className={classNames(
                'bg-white',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2'
            )}
        >
            <ul>
                {posts.map((post) => (
                    <div key={post.id} className="flex flex-col rounded-md h-[130px] justify-between border-b hover:bg-gray-100">
                        <div className="flex items-center pt-[24px] pl-[20px] pr-[40px]">
                            <div className="flex-shrink-0 flex flex-col bg-primary h-[54px] w-[54px] items-center justify-center rounded-full">
                                <Image src={post.icon} alt={"icon"} className="h-[40px] w-[40px]"/>
                            </div>
                            <div className="flex flex-col ml-[16px]">
                                <h3 className="text-[15px] font-semibold">{post.title}</h3>
                                <p className="mt-1 text-[13px] text-gray-500">{post.content}</p>
                            </div>
                        </div>
                        <div className="flex justify-end px-4 text-[13px] font-light text-[#9B9B9B]">
                            <div>{post.date}</div>
                        </div>
                    </div>
                ))}
            </ul>
        </Tab.Panel>
    )
}

export default function Example() {
    let [categories] = useState({
        'Tümü': [
            {
                id: 1,
                title: 'Siparişiniz teslim edildi📍',
                content: '2563412 siparişiniz teslim edildi, deneyiminizle ilgili yorum yapabilirsin. 🤗',
                date: 'Bugün',
                commentCount: 5,
                shareCount: 2,
                icon: ICONS.orderComp
            },
            {
                id: 2,
                title: 'Kargonuz yola çıktı🚚',
                content: '2563412 siparişiniz kargoya verildi, siparişlerim sayfasından kargonuzu takip edebilirsiniz.',
                date: 'Dün',
                commentCount: 3,
                shareCount: 2,
                icon: ICONS.deliveryTruck
            },
            {
                id: 3,
                title: 'Siparişiniz hazırlanıyor📦',
                content: '2563412 siparişini hazırlıyoruz, siparişlerim sayfasında siparişinizi takip edebilirsiniz.',
                date: 'Pazartesi',
                commentCount: 2,
                shareCount: 1,
                icon: ICONS.deliveryTime
            },
            {
                id: 1,
                title: 'Size özel 10€ indirim kuponu🎁',
                content: 'Size özel bu hafta tüm ürünlerde kullanabileceğiniz 10 € indirim kuponu hediye.',
                date: '27/12/2023',
                commentCount: 9,
                shareCount: 5,
                icon: ICONS.orderComp
            },
            {
                id: 2,
                title: 'Coca Cola Ürünlerinde İndirim',
                content: 'Bu hafta tüm Coca Cola ürünlerinde %10 indirim. Bu fırsatı kaçırmayın, hemen sipariş verin.',
                date: '27/12/2023',
                commentCount: 4,
                shareCount: 3,
                icon: ICONS.orderComp
            },
        ],
        'Siparişlerim': [
            {
                id: 1,
                title: 'Siparişiniz teslim edildi📍',
                content: '2563412 siparişiniz teslim edildi, deneyiminizle ilgili yorum yapabilirsin. 🤗',
                date: 'Bugün',
                commentCount: 5,
                shareCount: 2,
                icon: ICONS.orderComp
            },
            {
                id: 2,
                title: 'Kargonuz yola çıktı🚚',
                content: '2563412 siparişiniz kargoya verildi, siparişlerim sayfasından kargonuzu takip edebilirsiniz.',
                date: 'Dün',
                commentCount: 3,
                shareCount: 2,
                icon: ICONS.deliveryTruck
            },
            {
                id: 3,
                title: 'Siparişiniz hazırlanıyor📦',
                content: '2563412 siparişini hazırlıyoruz, siparişlerim sayfasında siparişinizi takip edebilirsiniz.',
                date: 'Pazartesi',
                commentCount: 2,
                shareCount: 1,
                icon: ICONS.deliveryTime
            },
        ],
        'Kuponlarım': [
            //
        ],
    })

    const [activeTab, setActiveTab] = useState('Tümü')

    return (
        <div className="w-full ">
            <Tab.Group>
                <Tab.List className="flex border-b bg-white">
                    {Object.keys(categories).map((category) => (
                        <Tab
                            key={category}
                            className={({ selected }) =>
                                classNames(
                                    'mx-3 h-[47px] text-[16px] font-bold text-[#6D6D6D]',
                                    selected ? 'pb-0 text-primary' : 'pb-1'
                                )
                            }
                            onClick={() => setActiveTab(category)}
                        >
                            <div className="flex flex-col">
                            <div className="mb-1">{category}</div>
                                {activeTab === category && (
                                    <div className="flex h-1 rounded-full bg-amber-400"></div>)}
                            </div>
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels>

                    {activeTab === 'Kuponlarım' ? <MyCoupons/> :<>
                    {Object.values(categories).map((posts, idx) => (
                        <TabContent key={idx} posts={posts} />
                    ))}</>}
                </Tab.Panels>
            </Tab.Group>
            <BottomNavBar/>
        </div>

    )
}





