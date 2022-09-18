
function Loading({ text=null, width=100, height=100, borderWidth=5, color='#2fd6dd', scpace='0 auto 1em' }) {

    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="w-full">
                <div style={{
                        height: height,
                        width: width,
                        margin: scpace
                    }} className="lg-lds lds-ring">
                    <div style={{
                        borderColor: `${color} transparent transparent transparent`,
                        height: height,
                        width: width,
                        borderWidth: `${borderWidth}px`
                    }}></div>
                    <div style={{
                        borderColor: `${color} transparent transparent transparent`,
                        height: height,
                        width: width,
                        borderWidth: `${borderWidth}px`
                    }}></div>
                    <div style={{
                        borderColor: `${color} transparent transparent transparent`,
                        height: height,
                        width: width,
                        borderWidth: `${borderWidth}px`
                    }}></div>
                    <div style={{
                        borderColor: `${color} transparent transparent transparent`,
                        height: height,
                        width: width,
                        borderWidth: `${borderWidth}px`
                    }}></div>
                </div>
                {text !== 'null' && <div className="w-full mt-2">{text ?? 'Insperr.'}</div>}
            </div>
        </div>
    )
}

export default Loading