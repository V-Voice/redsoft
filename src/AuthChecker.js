export default function checkAuth() {
   
    if (!localStorage.getItem('user')) {
      return false;
    }
    else {
        return true;
    }
}