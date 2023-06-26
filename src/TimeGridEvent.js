import clsx from 'clsx'
import React from 'react'

function stringifyPercent(v) {
  return typeof v === 'string' ? v : v + '%'
}

/* eslint-disable react/prop-types */
function TimeGridEvent(props) {
  const {
    style,
    className,
    event,
    accessors,
    rtl,
    selected,
    label,
    continuesPrior,
    continuesAfter,
    getters,
    onClick,
    onDoubleClick,
    isBackgroundEvent,
    onKeyPress,
    components: {
      event: Event,
      eventWrapper: EventWrapper,
      eventInnerWrapper: EventInnerWrapper,
    },
  } = props
  let title = accessors.title(event)
  let tooltip = accessors.tooltip(event)
  let end = accessors.end(event)
  let start = accessors.start(event)

  let userProps = getters.eventProp(event, start, end, selected)

  let { height, top, width, xOffset } = style
  let inner = [
    <div key="1" className="rbc-event-label">
      {label}
    </div>,
    <div key="2" className="rbc-event-content">
      {Event ? <Event event={event} title={title} /> : title}
    </div>,
  ]

  inner = EventInnerWrapper ? (
    <EventInnerWrapper>
      <div key="2" className="rbc-event-content">
        {Event ? <Event event={event} title={title} /> : title}
      </div>
    </EventInnerWrapper>
  ) : (
    inner
  )

  const eventStyle = isBackgroundEvent
    ? {
        ...userProps.style,
        top: stringifyPercent(top),
        height: stringifyPercent(height),
        // Adding 10px to take events container right margin into account
        width: `calc(${width} + 10px)`,
        [rtl ? 'right' : 'left']: stringifyPercent(Math.max(0, xOffset)),
      }
    : {
        ...userProps.style,
        top: stringifyPercent(top),
        width: stringifyPercent(width),
        height: stringifyPercent(height),
        [rtl ? 'right' : 'left']: stringifyPercent(xOffset),
      }

  return (
    <EventWrapper type="time" {...props}>
      <div
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        style={eventStyle}
        onKeyPress={onKeyPress}
        title={
          tooltip
            ? (typeof label === 'string' ? label + ': ' : '') + tooltip
            : undefined
        }
        className={clsx(
          isBackgroundEvent ? 'rbc-background-event' : 'rbc-event',
          className,
          userProps.className,
          {
            'rbc-selected': selected,
            'rbc-event-continues-earlier': continuesPrior,
            'rbc-event-continues-later': continuesAfter,
          }
        )}
      >
        {inner}
      </div>
    </EventWrapper>
  )
}

export default TimeGridEvent
