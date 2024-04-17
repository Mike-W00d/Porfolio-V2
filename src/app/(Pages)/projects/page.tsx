import React from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Projects | Michael Wood | Full Stack Developer',
};


const Projects = () => {
  return (
    <div className='m-4'>
      <h1 className=' flex font-bold text-4xl text-fedblue text-center justify-center mb-10'>
        Projects</h1>
        <div className='flex bg-white w-full rounded-lg shadow-xl flex-col'>
          <span className='text-fedblue text-xl font-bold'> Bald Bible </span>
          <span> Primary Language - Javascript </span>
          <span> Tech Stack - Node, React, MongoDB, Express. Testing - Cypress, Jest</span>
        </div>
    </div>
  )
}

export default Projects
