## Click War APIs

### POST /auth/register

Required field(s):

- `name` (String)
- `username` (String)
- `password` (String)

### POST /auth/login

Required field(s):

- `username` (String)
- `password` (String)

### GET /scores

Returns score list (Array)

### GET /scores/:id

Returns a score with given id (Object)

### GET /scores/user/:user_id

Returns score list of specific user (Array)

### POST /scores

Required field(s)

- `winner` (String - User's username)
- `loser` (String - User's username)
- `winner_score` (Number)
- `loser_score` (Number)

### DELETE /scores/:id

Deletes a score with given id

