import { z, ZodError } from 'zod'
import type { FieldValues } from 'react-hook-form'

export const customZodResolver =
  (schema: z.ZodSchema) => async (values: FieldValues) => {
    try {
      const parsedValues = await schema.parseAsync(values)
      return { values: parsedValues, errors: {} }
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          values: {},
          errors: error.issues.reduce((acc, issue) => {
            const path = issue.path.join('.') || issue.path[0].toString()
            acc[path] = { type: issue.code, message: issue.message }
            return acc
          }, {} as any),
        }
      }
      return { values: {}, errors: {} }
    }
  }
