
export const Label = ({text}: {text: any})  => {
    return <div>
        <div>
            <label className="font-semibold" htmlFor={text} >{text}</label>
        </div>
    </div>
}