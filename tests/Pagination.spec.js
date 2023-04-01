import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '../components/Pagination.vue'

describe('Pagination', () => {
  const pageUpdatedEventName = 'pageUpdated'
  const firstPageButtonId = '#first-page-button'
  const lastPageButtonId = '#last-page-button'
  const secondPageButtonId = '#page-button-2'
  const componentArguments = {
    props: {
      totalPages: 4,
      total: 80,
    },
  }
  const mountComponent = () => {
    return mount(Pagination, componentArguments)
  }

  it('is a Vue instance', () => {
    const wrapper = mountComponent()

    expect(wrapper.vm).toBeTruthy()
  })

  it('disables the "First" button on mounted', () => {
    const wrapper = mountComponent()
    const firstPageButton = wrapper.get(firstPageButtonId)

    expect(firstPageButton.isDisabled()).toBe(true)
  })

  it(`sets the page to "4" when clicking the "Last" button`, async () => {
    const wrapper = mountComponent()

    await wrapper.get(lastPageButtonId).trigger('click')

    const emittedEvents = wrapper.emitted()
    const pageUpdatedEvent = wrapper.emitted(pageUpdatedEventName)

    expect(emittedEvents).toHaveProperty(pageUpdatedEventName)
    expect(pageUpdatedEvent[0]).toEqual([4])
  })

  it(`sets the page to "1" when clicking the "First" button`, async () => {
    const wrapper = mountComponent()

    await wrapper.get(lastPageButtonId).trigger('click')
    await wrapper.get(firstPageButtonId).trigger('click')

    const emittedEvents = wrapper.emitted()
    const pageUpdatedEvent = wrapper.emitted(pageUpdatedEventName)

    expect(emittedEvents).toHaveProperty(pageUpdatedEventName)
    expect(pageUpdatedEvent[1]).toEqual([1])
  })

  it('sets the correct page when a page button is clicked', async () => {
    const wrapper = mountComponent()

    await wrapper.get(secondPageButtonId).trigger('click')

    const emittedEvents = wrapper.emitted()
    const pageUpdatedEvent = wrapper.emitted(pageUpdatedEventName)

    expect(emittedEvents).toHaveProperty(pageUpdatedEventName)
    expect(pageUpdatedEvent[0]).toEqual([2])
  })

  it('displays correct buttons', async () => {
    const wrapper = mountComponent()
    let currentState = wrapper.vm.pages.map((page) => page.name)

    expect(currentState).toStrictEqual([1, 2, 3])
    await wrapper.get('#page-button-3').trigger('click')

    currentState = wrapper.vm.pages.map((page) => page.name)
    expect(currentState).toStrictEqual([2, 3, 4])
  })
})
