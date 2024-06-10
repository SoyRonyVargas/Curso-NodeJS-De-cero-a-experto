


export type UpdateTodoDTO = {
    completedAt?: Date | null,
    text: string
    id: number
}

export type CreateTodoDTO = Pick<UpdateTodoDTO, 'completedAt' | 'text'>;