import * as Tabs from '@radix-ui/react-tabs'
import { useState } from 'react'

import { CreateTodoForm } from '@/client/components/CreateTodoForm'
import { TodoList } from '@/client/components/TodoList'

/**
 * QUESTION 6:
 * -----------
 * Implement quick filter/tab feature so that we can quickly find todos with
 * different statuses ("pending", "completed", or both). The UI should look like
 * the design on Figma.
 *
 * NOTE:
 *  - For this question, you must use RadixUI Tabs component. Its Documentation
 *  is linked below.
 *
 * Documentation references:
 *  - https://www.radix-ui.com/docs/primitives/components/tabs
 */

export type TabStructure = {
  value: string
  label: string
}
const LIST_TABS: TabStructure[] = [
  {
    value: 'all',
    label: 'all',
  },
  {
    value: 'pending',
    label: 'pending',
  },
  {
    value: 'completed',
    label: 'completed',
  },
]

export type TodoStatuses = ('completed' | 'pending')[]

const Index = () => {
  const [filter, setFilter] = useState<TodoStatuses>(['pending', 'completed'])

  const handleChangeFilter = (v: string) => {
    if (v === 'all') {
      setFilter(['pending', 'completed'])
    } else if (v === 'pending') {
      setFilter(['pending'])
    } else if (v === 'completed') {
      setFilter(['completed'])
    } else {
      throw new Error('Invalid filter')
    }
  }

  return (
    <main className="mx-auto w-[480px] pt-12">
      <div className="rounded-12 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>

        <div className="pt-10">
          <Tabs.Root
            onValueChange={(v) => handleChangeFilter(v)}
            defaultValue="all"
            defaultChecked={true}
            orientation="vertical"
          >
            <Tabs.List aria-label="tabs example">
              {LIST_TABS.map((item) => (
                <Tabs.Trigger
                  className="mr-2 inline-block rounded-full border border-gray-200 px-6 py-3 text-sm font-bold capitalize text-gray-700  transition-all data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs.Root>
        </div>
        <div className="pt-10">
          <TodoList filterData={filter} />
        </div>

        <div className=" pt-10">
          <CreateTodoForm />
        </div>
      </div>
    </main>
  )
}

export default Index
