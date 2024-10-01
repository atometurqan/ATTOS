export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full items-center my-8 mb-24 md:my-0 md:mb-0 flex justify-center h-full">
            {children}
        </div>
    )

}