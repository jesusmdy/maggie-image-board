const styles = {
  imageItem: {
    overflow: 'hidden',
    mb: 4,
  },
  contentBox: {
    flex: 1,
    bgColor: 'white',
    shadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;',
    rounded: 8,
    p: 0
  },
  expandibleOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    w: 'full',
    h: 'full',
    bgImage: 'linear-gradient(360deg, rgba(25 25 25 / 30%), transparent)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
    p: 4
  },
  expandButton: {
    w: '30%',
    shadow: 'md',
    py: 6,
    rounded: 32,
    size: 'sm'
  },
  tagsStyle: {
    listStyle: 'none',
    display: 'flex',
    flexWrap: 'wrap'
  }
}

export default styles
