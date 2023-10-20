import { Button } from '@radix-ui/themes'
import React from 'react'

export const Spinner = () => {
  return (
<div>
    <Button disabled>
    <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
    </svg>
      Submitting...
    </Button>
</div>
  )
}
