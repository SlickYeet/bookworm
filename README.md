BookWorm is a book borrowing university library management solution.

## TODOs

- [x] Migrate to Prisma
- [ ] Remove RootLayout suppressHydrationWarning prop
- [x] Fetch all books from the database on the `LibraryPage`
- [ ] Get user borrowed books on the `ProfilePage`
- [x] Make the all admin forms prettier
- [ ] Display final summery on the left of admin forms
- [ ] Admin Dashboard (charts and stuff)
- [ ] Implement all admin tables and their functionalities _(WIP)_
- [ ] Implement loaned state in `BookCard`
- [ ] Define isBorrowed and isOverdue in `book` schema and its functionality
- [ ] Fix funky looking `Button` when no variant is applied
- [ ] Show similar (using genre) books on `BooksPage`
- [x] Fix broken search in `BorrowRecord` form
- [x] Fix Due date calender not showing correct month in `BorrowRecord` form
- [x] Fix redirect after submitting `BorrowRecord` form
- [x] Remove replacing real data if its null
- [ ] Find a better way to search for `BorrowRecords`
- [x] OAuth implementation
- [x] Email verification
- [ ] Password reset
- [ ] Fix emails not sending (Ratelimiting?)
- [ ] Add confetti to onboarding screen after finalizing profile
- [ ] Verify google oauth
