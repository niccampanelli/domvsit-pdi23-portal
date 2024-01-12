import TubeSpinner from "../../assets/icons/tube_spinner.svg?react"
import TubeSpinnerWhite from "../../assets/icons/tube_spinner_white.svg?react"
import { ISpinnerProps } from "../../types/components/Spinner"

export default function Spinner({
    color = "primary",
    size = 4,
    ...props
}: ISpinnerProps) {

    return (
        <div
            {...props}
        >
            {color === "primary" ?
                <TubeSpinner
                    width={size + "rem"}
                    height={size + "rem"}
                />
                :
                <TubeSpinnerWhite
                    width={size + "rem"}
                    height={size + "rem"}
                />
            }
        </div>
    )
}