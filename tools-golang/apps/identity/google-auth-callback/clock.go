package main

import "time"

type clock interface {
	UnixMilli() int64
}

func NewClock() clock {
	return time.Now()
}
