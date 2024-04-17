
export const Label = ({text}: {text: any})  => {
    return <div>
        <div>
            <label htmlFor={text} >{text}</label>
        </div>
    </div>
}