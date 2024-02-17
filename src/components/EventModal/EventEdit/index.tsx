import { Controller, useForm } from "react-hook-form"
import { IEventEditProps } from "../../../types/components/EventModal"
import styles from "./eventEdit.module.css"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Input from "../../Input"
import Button from "../../Button"
import TagsInput from "../../TagsInput"

const schema = yup.object().shape({
    title: yup
        .string()
        .required("Insira um título para o evento"),
    description: yup
        .string()
        .required("Insira uma descrição para o evento"),
    tags: yup
        .array()
        .of(
            yup
                .string()
                .required("Insira ao menos uma tag")
        ),
    link: yup
        .string()
        .url("Insira um link válido"),
    ocurrence: yup
        .date()
        .min(new Date(), "Insira uma data futura")
        .required("Insira uma data para o evento"),
    eventAttendants: yup
        .array()
        .of(
            yup.object().shape({
                id: yup
                    .number(),
                eventId: yup
                    .number(),
                attendantId: yup
                    .number()
            })
        )
        .required("Insira ao menos um participante")
})

const defaultValues = {
    title: "",
    description: "",
    tags: [] as string[],
    link: "",
    ocurrence: new Date(),
    eventAttendants: []
}

export default function EventEdit({
    event
}: IEventEditProps) {

    const {
        control,
        handleSubmit,
    } = useForm({
        mode: 'all',
        defaultValues,
        resolver: yupResolver(schema)
    })

    async function handleEdit(model: any) {
        console.log(model)
    }

    return (
        <form
            className={styles.content}
            onSubmit={handleSubmit(handleEdit, console.log)}
        >
            <Controller
                name="title"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <Input
                        {...field}
                        placeholder="Título"
                        error={error?.message}
                    />
                )}
            />
            <Controller
                name="description"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <Input
                        {...field}
                        placeholder="Descrição"
                        error={error?.message}
                        lines={5}
                    />
                )}
            />
            <Controller
                name="link"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <Input
                        {...field}
                        placeholder="Link"
                        error={error?.message}
                        autoFocus
                    />
                )}
            />
            <Controller
                name="tags"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TagsInput
                        {...field}
                        placeholder="Tags"
                        error={error?.message}
                        autoFocus
                    />
                )}
            />
            <Button
                type="submit"
            >
                Salvar
            </Button>
        </form>
    )
}