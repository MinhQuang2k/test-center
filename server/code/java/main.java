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
		int parameter1Rows = Integer.parseInt(bufferedReader.readLine().trim());
		int parameter1Columns = Integer.parseInt(bufferedReader.readLine().trim());
		List<List<String>> parameter1 = new ArrayList<>();
		for (int i = 0; i < parameter1Rows; i++) {
			List<String> parameter1RowItems = new ArrayList<>();
			for (int j = 0; j < parameter1Columns; j++) {
				String parameter1Item = bufferedReader.readLine();;
				parameter1RowItems.add(parameter1Item);
			}
			parameter1.add(parameter1RowItems);
		}
			List<List<String>> result = Result.functionExample(parameter1);
		for (int i = 0; i < result.size(); i++) {
			for (int j = 0; j < result.get(i).size(); j++) {
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
    public static List<List<String>> functionExample(List<List<String>> parameter1) {
		return parameter1;
    }
}