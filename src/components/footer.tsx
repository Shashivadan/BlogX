import {  Twitter, Github } from 'lucide-react'

export default function Footer() {
  const links = [
    {
      href: "https://x.com/shashivadan99",
      icon: <Twitter size={20} />
    },
    {
      href: "https://github.com/Shashivadan",
      icon: <Github size={20} />
    }
  ]
  return (
    <footer className=" mx-auto max-w-4xl px-6 py-4">
      <div className='flex justify-between items-center '>
        <p  className='text-sm mb-4'>
        © {new Date().getFullYear()} shashivadan
        </p>
        <div className=' flex items-center gap-4'>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.icon}
          </a>
        ))}
        </div>
      </div>
    </footer>
  )
}
