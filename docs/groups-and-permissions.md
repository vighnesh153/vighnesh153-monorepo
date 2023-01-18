# Groups and Permissions

## Introduction

Every system needs a permission based access control for its users. There could be different types of users:

- Admin
- Moderator
- Regular/Normal, etc.

So, the very obvious solution that comes to mind is to create a bunch of roles and assign a set of permissions to those
roles. This doesn't scale very well because you will always come up with a requirement where you need some permission
for some users but not for all. So, you end up creating more roles to accommodate that. But, semantically, roles are
supposed to be limited and exhaustive.

To address this, in this system, we will be relying on [Groups](#groups).

## Permissions

A permission is a thing that grants a user, access to do some action. Examples:

- `UserInfo.Create`
- `UserInfo.Read`
- `UserInfo.Update`
- `UserInfo.Delete`
- `Blog.Create`
- `Blog.Read`
- `Blog.Edit`
- `Blog.Delete`

## Groups

Groups are very much similar to roles with very subtle differences.

- A user can belong to multiple groups
- We can theoretically create unlimited number of groups (without affecting the semantic meaning of groups)

A group mainly contains

- set of permissions
- set of users (who are part of this group)

## Requirements

- I should be able to create new groups
- I should be able to add user to a group
- I should be able to add/remove permissions to/from a group
- I should be able to add/remove 1 group to/from another group
- I should be able to see all the participants/users in a group
- I should be able to delete a group which should remove all the users from it
