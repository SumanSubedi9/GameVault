const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 mt-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Simple Footer Content */}
        <div className="flex flex-col items-center space-y-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-linear-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 6h-2V4c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v2H3c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM7 4h10v2H7V4zm11 6v8H6v-8h12zm-6 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
              </svg>
            </div>
            <div className="text-xl font-bold bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              GameVault
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm text-center max-w-md">
            Your premier destination for digital games. Build and play your
            collection.
          </p>

          {/* Copyright */}
          <div className="text-gray-500 text-xs">
            © 2024 GameVault. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
