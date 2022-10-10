const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const multipleBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }  
]

const oneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const equalLikes = [
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  },  
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 7,
    __v: 0
  }
]

const noBlogs = []

const favoriteResults = [
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 5
  },
  {}
  ,
  { title: 'React patterns', author: 'Michael Chan', likes: 7 }

]

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(noBlogs)
    expect(result).toBe(0)
  })

  test('of single entry, likes equal entry', () => {
    const result = listHelper.totalLikes(oneBlog)
    expect(result).toBe(5)
  })

  test('of multiple blogs, sums total likes', () => {
    const result = listHelper.totalLikes(multipleBlogs)
    expect(result).toBe(36)
  })
})


describe('favorite blog', () => {
  test('of multiple, returns most favorite', () => {
    const result = listHelper.favoriteBlog(multipleBlogs)
    expect(result).toEqual(favoriteResults[0])
  })

  test('of single entry, equals entry', () => {
    const result = listHelper.favoriteBlog(oneBlog)
    expect(result).toEqual(favoriteResults[1])
  })

  test('of empty list, should return empty obj', () => {
    const result = listHelper.favoriteBlog(noBlogs)
    expect(result).toBe()
  })

  test('of equal likes, returns first occuring', () => {
    const result = listHelper.favoriteBlog(equalLikes)
    expect(result).toEqual(favoriteResults[3])
  })
})


describe('most blogs', () => {
  test('of multiple, returns author with most blogs', () => {
    const result = listHelper.mostBlogs(multipleBlogs)
    expect(result).toEqual({ 'author': 'Robert C. Martin', 'blogCount': 3 })
  })

  test('of empty list', () => {
    const result = listHelper.mostBlogs(noBlogs)
    expect(result).toBe()
  })

  test('of single entry', () => {
    const result = listHelper.mostBlogs(oneBlog)
    expect(result).toEqual({ 'author': 'Edsger W. Dijkstra', 'blogCount': 1 })
  })

  test('of equal entry, returns first occurring', () => {
    const result = listHelper.mostBlogs(equalLikes)
    expect(result).toEqual({'author': 'Robert C. Martin', 'blogCount': 1})
  })
})


describe('most likes', () => {
  test('of multiple, returns author with most likes', () => {
    const result = listHelper.mostLikes(multipleBlogs)
    expect(result).toEqual({ 'author': 'Edsger W. Dijkstra', 'likes': 17 })
  })

  test('of empty list', () => {
    const result = listHelper.mostLikes(noBlogs)
    expect(result).toBe()
  })

  test('of single entry', () => {
    const result = listHelper.mostLikes(oneBlog)
    expect(result).toEqual({'author': 'Edsger W. Dijkstra', 'likes': 5})
  })

  test('of equal entry, returns first occurring', () => {
    const result = listHelper.mostLikes(equalLikes)
    expect(result).toEqual({'author': 'Michael Chan', 'likes': 7})
  })
})