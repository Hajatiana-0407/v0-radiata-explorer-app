export function Footer() {
  return (
    <footer className="border-t border-border bg-muted py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-4">
              <div className="h-8 w-8 rounded-full bg-primary"></div>
              Radiata
            </div>
            <p className="text-sm text-muted-foreground">
              Explore nature responsibly with Radiata Explorer.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/destinations" className="hover:text-primary">Destinations</a></li>
              <li><a href="/contact" className="hover:text-primary">Contact</a></li>
              <li><a href="/" className="hover:text-primary">Home</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <p className="text-sm text-muted-foreground">
              Email: info@radiata.com<br />
              Phone: +1 (555) 000-0000
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>© 2025 Radiata Explorer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
