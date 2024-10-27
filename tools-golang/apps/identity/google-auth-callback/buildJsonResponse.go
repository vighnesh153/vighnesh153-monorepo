package main

import "encoding/json"

func BuildJsonResponse(statusCode int, data interface{}) (*Response, error) {
	jsonData, err := json.Marshal(data)
	if err != nil {
		return nil, err
	}
	return &Response{
		StatusCode: statusCode,
		Body:       string(jsonData),
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
	}, nil
}
