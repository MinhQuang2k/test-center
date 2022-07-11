import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
public class Main {
   public static void main(String[] args) throws IOException {
      BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
      BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(System.out));
boolean param1 = Integer.parseInt(bufferedReader.readLine().trim()) != 0;
      int param2Count = Integer.parseInt(bufferedReader.readLine().trim());
      List<String> param2 = IntStream.range(0, param2Count).mapToObj(i -> {
         try {
            return bufferedReader.readLine().replaceAll("\\s+$", "");
         } catch (IOException ex) {
            throw new RuntimeException(ex);
         }
      })
      .map(String::trim).collect(Collectors.toList());
      int param3Rows = Integer.parseInt(bufferedReader.readLine().trim());
      int param3Columns = Integer.parseInt(bufferedReader.readLine().trim());
      List<List<String>> param3 = new ArrayList<>();
      for (int i = 0; i < param3Rows; i++) {
         List<String> param3RowItems = new ArrayList<>();
         for (int j = 0; j < param3Columns; j++) {
            String param3Item = bufferedReader.readLine().trim();
            param3RowItems.add(param3Item);
         }
         param3.add(param3RowItems);
      }

      List<List<String>> result = Result.functionName(param1, param2, param3);
      for (int i = 0; i < result.size(); i++) {
        for(int j = 0; j< result.get(i).size(); j++) {
            bufferedWriter.write(String.valueOf(result.get(i).get(j)));
            if (j != result.get(i).size() - 1) {
               bufferedWriter.write(" ");
            }
         }
         if (i != result.size() - 1) {
            bufferedWriter.write("\n");
         }
      }
bufferedWriter.newLine();
      bufferedReader.close();
      bufferedWriter.close();
   }
}
class Result {
   public static List<List<String>> functionName(boolean param1, List<String> param2, List<List<String>> param3) {
      //code here
       return param3;   }
}