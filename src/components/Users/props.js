
export default {
  label: {
    type: String,
    default: ''
  },
  color: {
    type: String
  },
  image: {
    type: String
  },
  type: {
    type: String,
    default: 'single',
    validator(value) {
      return ['single', 'group'].includes(value)
    }
  },
  size: {
    type: String,
    default: 'normal',
    validator(value) {
      return ['normal', 'large', 'xlarge'].includes(value)
    }
  },
  shape: {
    type: String,
    default: 'circle',
    validator(value) {
      return ['square', 'circle'].includes(value)
    }
  },
  avatarClasses: {
    type: String
  }
}
