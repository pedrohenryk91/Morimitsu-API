export interface DefaultRepository<T, ID> {
    create(data: T): Promise<T>
    findById(id: ID): Promise<T | null>
    update(id: ID, data: Partial<T>): Promise<T | null>
    delete(id: ID): Promise<void>
}