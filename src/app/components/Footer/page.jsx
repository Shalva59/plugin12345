import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative border-t border-cyan-500/20 bg-gray-900/50 backdrop-blur-xl">
      <div className="absolute inset-0 w-96 h-96 bg-cyan-500/5 -top-48 left-1/4 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-500 bg-clip-text text-transparent mb-4">
              PLUG-IN
            </h3>
            <p className="text-gray-400 leading-relaxed">
              თანამედროვე ტექნოლოგიური გადაწყვეტილებები თქვენი ბიზნესისთვის
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">მთავარი</h4>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                მთავარი
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                ჩვენ შესახებ
              </Link>
              <Link href="/services" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                სერვისები
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">კონტაქტი</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail size={18} className="text-cyan-400" />
                <span>info@plug-in.ge</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="text-cyan-400" />
                <span>+995 555 123 456</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} className="text-cyan-400" />
                <span>თბილისი, საქართველო</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cyan-500/20 text-center text-gray-400">
          <p>&copy; 2025 PLUG-IN. ყველა უფლება დაცულია.</p>
        </div>
      </div>
    </footer>
  )
}
