import Image from 'next/image'
import {IoMdNotifications} from 'react-icons/io'
import Link from 'next/link'
import React from 'react'
import SideBar from '../sidebar/SideBar'
import dynamic from 'next/dynamic'

const NavBar = () => {
  const data =[
    {name:'Menu Item 1',subMenu:[
     {name:'subMenuItem1',itemImg:'https://fastly.picsum.photos/id/322/64/64.jpg?hmac=GPBpScfDWKJl0C8fQNJAkjALeR3YbyIoR49Z9OXpe6A'},
     {name:'subMenuItem2',itemImg:'https://fastly.picsum.photos/id/322/64/64.jpg?hmac=GPBpScfDWKJl0C8fQNJAkjALeR3YbyIoR49Z9OXpe6A'},
     {name:'subMenuItem3',itemImg:'https://fastly.picsum.photos/id/322/64/64.jpg?hmac=GPBpScfDWKJl0C8fQNJAkjALeR3YbyIoR49Z9OXpe6A'},
     {name:'subMenuItem4',itemImg:'https://fastly.picsum.photos/id/322/64/64.jpg?hmac=GPBpScfDWKJl0C8fQNJAkjALeR3YbyIoR49Z9OXpe6A'},
     {name:'subMenuItem5',itemImg:'https://fastly.picsum.photos/id/322/64/64.jpg?hmac=GPBpScfDWKJl0C8fQNJAkjALeR3YbyIoR49Z9OXpe6A'},
     {name:'subMenuItem6',itemImg:'https://fastly.picsum.photos/id/322/64/64.jpg?hmac=GPBpScfDWKJl0C8fQNJAkjALeR3YbyIoR49Z9OXpe6A'},
    ]},
    {name:'Menu Item 2'},
    {name:'Menu Item 3'},
    {name:'Menu Item 4'},
    {name:'Menu Item 5'}
  ]
  return (
    <nav className='w-full bg-primary'>
        <div className="flex items-center justify-between p-4">
                   <SideBar data={data}/>
                <div className=""><Link className='text-secondary' href='/'>
                    <Image
                        src='/goomart.svg'
                        alt='goomart'
                        width={100}
                        height={80}
                    />
                    </Link></div>
                <div className="">
                        <Link href='/'>
                            <IoMdNotifications className='text-secondary' size={30}/>
                        </Link>

                </div>
        </div>
    </nav>
  )
}

export default NavBar