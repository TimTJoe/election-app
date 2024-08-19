function age(params) {
      const birthYear = new Date(fullDate).getFullYear();
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const birthMonth = new Date(fullDate).getMonth();

      let age = currentYear - birthYear;

      // Adjust age if birthdate has not occurred yet this year
      if (
        currentMonth < birthMonth ||
        (currentMonth === birthMonth &&
          new Date().getDate() < new Date(fullDate).getDate())
      ) {
        age--;
      }

      return age;
    
}

export default {age}