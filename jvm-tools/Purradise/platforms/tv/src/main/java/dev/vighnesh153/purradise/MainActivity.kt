package dev.vighnesh153.purradise

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.tv.material3.Surface
import androidx.tv.material3.Text
import dev.vighnesh153.purradise.ui.theme.PurradiseTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            PurradiseTheme {
                Surface(Modifier.fillMaxSize()) {
                    Text(
                        text = "Hello Kitty!",
                        modifier = Modifier.align(Alignment.Center),
                    )
                }
            }
        }
    }
}
