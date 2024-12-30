export function ScreenWidth() {
  return (
    <div className="fixed bottom-0 left-0 z-[9999] m-8 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-white sm:bg-pink-500 md:bg-orange-500 lg:bg-green-500 xl:bg-blue-500">
      <div className="block sm:hidden md:hidden lg:hidden xl:hidden">xs</div>
      <div className="hidden sm:block md:hidden lg:hidden xl:hidden">sm</div>
      <div className="hidden sm:hidden md:block lg:hidden xl:hidden">md</div>
      <div className="hidden sm:hidden md:hidden lg:block xl:hidden">lg</div>
      <div className="hidden sm:hidden md:hidden lg:hidden xl:block">xl</div>
    </div>
  )
}
