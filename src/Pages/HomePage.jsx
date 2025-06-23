// src/pages/HomePage.jsx
import React from 'react'
import AboutMe from '../component/AboutMe'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">

      <section className="mt-8 px-4 mx-auto max-w-4xl">
        <AboutMe />
      </section>
      
    </div>

  )
}
