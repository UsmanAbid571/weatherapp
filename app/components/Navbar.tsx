import { Button } from '@/components/ui/Button'
import { ModeToggle } from '@/components/ui/Modetoggle'
import { search } from '../utils/Icons'
import React from 'react'
import SearchDialog from './SearchDialog/SearchDialog'

const Navbar = () => {
  return (
    <div className='flex items-center justify-end py-3 gap-3 mx-5'>
        <SearchDialog/>
      <Button>Button</Button>
      <ModeToggle/>
      
    </div>
  )
}

export default Navbar
