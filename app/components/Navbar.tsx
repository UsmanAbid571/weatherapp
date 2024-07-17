import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { ModeToggle } from '@/components/ui/Modetoggle'
import { search } from '../utils/Icons'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-end py-3 gap-3 mx-5'>
        <Input className='w-[300px]' type="text" placeholder="Search"/>
      <Button>Button</Button>
      <ModeToggle/>
      
    </div>
  )
}

export default Navbar
