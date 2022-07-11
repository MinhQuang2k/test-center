#include <assert.h>
#include <ctype.h>
#include <limits.h>
#include <math.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <malloc.h>

char *readline();
char* ltrim(char*);
char* rtrim(char*);
int parse_int(char*);
long parse_long(char*);

void printArr(int rows, int cols, int* arr) {
   for(int i = 0; i< rows; i++) {
      for(int j = 0;j < cols; j++) {
         printf("%d ", *(arr + i * cols + j));
         fflush(stdout);
      }
      printf("\n");
      fflush(stdout);
   }
}
void *functionName(bool param1, int param2_count, char** param2, int param3_rows, int param3_cols, int* param3){
   //code here
   printArr(param3_rows, param3_cols,  param3);
}

int main()
{
   bool param1 = ltrim(rtrim(readline()));
int param2_count = parse_int(ltrim(rtrim(readline())));
   char** param2 = calloc(param2_count, sizeof(char*));
   for (int i = 0;i < param2_count; i++) {
      char* param2_item = ltrim(rtrim(readline()));
      *(param2 + i) = param2_item;
   }

int param3_rows = parse_int(ltrim(rtrim(readline())));
   int param3_cols = parse_int(ltrim(rtrim(readline())));
   int param3_arr[param3_rows][param3_cols];

   for(int i = 0; i < param3_rows; i++) {
      for(int j = 0; j < param3_cols; j++) {
         int param3_item = parse_int(ltrim(rtrim(readline())));
         param3_arr[i][j] = param3_item;
      }
   }
   int *param3 = &param3_arr[0][0];
functionName(param1, param2_count,  param2, param3_rows, param3_cols, param3);
}
char* readline() {
   size_t alloc_length = 1024;
   size_t data_length = 0;
   char* data = malloc(alloc_length);
   while (true) {
      char* cursor = data + data_length;
       char* line = fgets(cursor, alloc_length - data_length, stdin);
       if (!line) {
         break;
      }
      data_length += strlen(cursor);
      if (data_length < alloc_length - 1 || data[data_length - 1] == '\n') {
         break;
      }
      alloc_length <<= 1;
      data = realloc(data, alloc_length);
      if (!data) {
         data = '\0';
         break;
}
      }
       if (data[data_length - 1] == '\n') {
         data[data_length - 1] = '\0';
          data = realloc(data, data_length);
      if (!data) {
         data = '\0';
      }
   } else {
     data = realloc(data, data_length + 1);

      if (!data) {
         data = '\0';
      } else {
         data[data_length] = '\0';
      }
   }
   return data;
}
char* ltrim(char* str) {
   if (!str) {
      return '\0';
   }
   if (!*str) {
      return str;
   }
   while (*str != '\0' && isspace(*str)) {
      str++;
   }
   return str;
}
char* rtrim(char* str) {
   if (!str) {
      return '\0';
   }
   if (!*str) {
      return str;
   }
   char* end = str + strlen(str) - 1;
   while (end >= str && isspace(*end)) {
      end--;
   }      *(end + 1) = '\0';
   return str;
}
int parse_int(char* str) {
   char* endptr;
   int value = strtol(str, &endptr, 10);
   if (endptr == str || *endptr != '\0') {
      exit(EXIT_FAILURE);
   }
      return value;
}
long parse_long(char* str) {
   char* endptr;long value = strtol(str, &endptr, 10);
   if (endptr == str || *endptr != '\0') {
      exit(EXIT_FAILURE);
}
   return value;
}