import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  // Don't show footer on specific pages where it might interfere (e.g., inside the studio layout which might have its own constraints, though requirements say "All pages")
  // The requirements say "Footer must be visible on... All user roles (fans, creators, agents)". 
  // MainLayout wraps viewer pages. StudioLayout wraps studio pages. We should ideally add this to both, or make MainLayout used in both?
  // Current app uses MainLayout for user pages and StudioLayout for studio. 
  // I will assume this Footer component will be added to MainLayout and StudioLayout.

  return (
    <footer className="w-full bg-[#05020d] border-t border-white/10 pt-16 pb-8 z-40 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-lg overflow-hidden flex items-center justify-center glow-primary-sm group-hover:shadow-glow transition-all duration-300">
                <img src="/logo.png" alt="StreamVault" className="h-full w-full object-cover" />
              </div>
              <span className="text-xl font-black text-gradient tracking-tight">
                StreamVault
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              The premium platform for creators and fans. Unlock exclusive content, join live streams, and connect directly with your favorite stars.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/creators" className="hover:text-primary transition-colors">For Creators</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/legal/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/legal/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              <li><Link to="/legal/dmca" className="hover:text-primary transition-colors">DMCA</Link></li>
              <li><Link to="/legal/compliance" className="hover:text-primary transition-colors">Compliance</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Social</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Twitter / X</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-medium">
            © {currentYear} StreamVault. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground font-medium">
             <span>v1.2.0 (Beta)</span>
             <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                System Operational
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
