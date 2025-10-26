function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-card mt-auto border-t">
      <div className="container-app py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-lg font-semibold">Tixly</h3>
            <p className="text-muted-foreground text-sm">
              Modern ticket management made simple and efficient.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-medium">Quick Links</h4>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-medium">Contact</h4>
            <p className="text-muted-foreground text-sm">support@tixly.com</p>
          </div>
        </div>
        <div className="border-border text-muted-foreground mt-8 border-t pt-6 text-center text-sm">
          &copy; {year} Tixly. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
