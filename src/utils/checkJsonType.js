export default function checkJsonType(value) {
   try {
      return !!JSON.parse(value)
   } catch (error) {
      return false
   }
}
