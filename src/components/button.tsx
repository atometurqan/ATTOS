interface IButton {
    children?: React.ReactNode,
    className?: string
}
export default function Button (props :IButton) {
    return (
        <button className={"border p-2 text-sm rounded border-solid border-[#333]".concat(" ", props.className as string)}>
            {props.children}
        </button>
    )
}